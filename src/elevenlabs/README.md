# ElevenLabs API Tests

## API Key Permissions

Your ElevenLabs API key **must** have the following permissions enabled:

| Permission | Required By |
|---|---|
| **user_read** | `test_api_key_valid` — validates the key via `GET /v1/user` |
| **Text to Speech** | `test_tts_returns_mp3` — generates audio via `POST /v1/text-to-speech` |

To configure permissions:

1. Go to [elevenlabs.io](https://elevenlabs.io) → Profile → API Keys
2. Edit your key's permissions
3. Ensure both **user_read** and **Text to Speech** are checked

## API Key Format

The key is a 64-character hex string (65 characters including the newline when echoed). It does **not** have a prefix like `sk_` or `isk_`.

Verify your key format:

```bash
echo $ELEVENLABS_API_KEY | wc -c
      65
```

If you see a different length or the key starts with `sk_` or `isk_`, re-copy it from the ElevenLabs API Keys page.

## Usage

```bash
export ELEVENLABS_API_KEY="your-key-here"
python3 src/elevenlabs/text-to-speech-api-test.py
```
