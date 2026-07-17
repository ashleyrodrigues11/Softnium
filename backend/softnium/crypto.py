import base64
import json
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from django.conf import settings
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

def get_cipher():
    key = settings.API_ENCRYPTION_KEY.encode('utf-8')
    iv = settings.API_ENCRYPTION_IV.encode('utf-8')
    return AES.new(key, AES.MODE_CBC, iv)

def encrypt_payload(data_string):
    cipher = get_cipher()
    padded_data = pad(data_string.encode('utf-8'), AES.block_size)
    encrypted = cipher.encrypt(padded_data)
    return base64.b64encode(encrypted).decode('utf-8')

def decrypt_payload(encrypted_string):
    cipher = get_cipher()
    encrypted_data = base64.b64decode(encrypted_string)
    decrypted_padded = cipher.decrypt(encrypted_data)
    decrypted = unpad(decrypted_padded, AES.block_size)
    return decrypted.decode('utf-8')

class EncryptedJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        json_bytes = super().render(data, accepted_media_type, renderer_context)
        if json_bytes:
            encrypted_str = encrypt_payload(json_bytes.decode('utf-8'))
            return super().render({'payload': encrypted_str}, accepted_media_type, renderer_context)
        return json_bytes

class EncryptedJSONParser(JSONParser):
    def parse(self, stream, media_type=None, parser_context=None):
        parsed_data = super().parse(stream, media_type, parser_context)
        if isinstance(parsed_data, dict) and 'payload' in parsed_data:
            try:
                decrypted_json = decrypt_payload(parsed_data['payload'])
                return json.loads(decrypted_json)
            except Exception:
                pass
        return parsed_data
