#!/usr/bin/env python3
"""Minimal test: verify ElevenLabs TTS API returns valid MP3 audio.

Usage:
    python3 src/elevenlabs/text-to-speech-api-test.py

Requires ELEVENLABS_API_KEY in the environment.
"""

import json
import os
import sys
import tempfile
import urllib.request
import urllib.error


API_BASE = "https://api.elevenlabs.io/v1"
VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"  # George
MODEL_ID = "eleven_multilingual_v2"


def get_api_key():
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        print("FAIL: ELEVENLABS_API_KEY not set")
        sys.exit(1)
    return key


def test_api_key_valid():
    """Test 1: Verify the API key is accepted."""
    api_key = get_api_key()
    req = urllib.request.Request(
        f"{API_BASE}/user",
        headers={"xi-api-key": api_key},
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read())
            assert "xi_api_key" in data or "subscription" in data, "Unexpected response shape"
            print("PASS: test_api_key_valid")
    except urllib.error.HTTPError as e:
        print(f"FAIL: test_api_key_valid — HTTP {e.code}: {e.read().decode()}")
        sys.exit(1)


def test_tts_returns_mp3():
    """Test 2: Generate a short TTS clip and verify it's valid MP3."""
    api_key = get_api_key()
    payload = json.dumps({
        "text": "Bryophytes",
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.7,
            "similarity_boost": 0.8,
        },
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{API_BASE}/text-to-speech/{VOICE_ID}",
        data=payload,
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            audio = resp.read()
            # MP3 files start with ID3 tag or FF FB/FF F3 sync bytes
            is_mp3 = audio[:3] == b"ID3" or (len(audio) > 1 and audio[0] == 0xFF and audio[1] in (0xFB, 0xF3, 0xF2, 0xE0))
            assert is_mp3, f"Not MP3: first bytes = {audio[:4].hex()}"
            assert len(audio) > 1000, f"Audio too small ({len(audio)} bytes)"

            # Write to temp file to confirm it's a complete file
            with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as f:
                f.write(audio)
                tmp_path = f.name

            file_size = os.path.getsize(tmp_path)
            os.unlink(tmp_path)

            print(f"PASS: test_tts_returns_mp3 — {file_size:,} bytes")

    except urllib.error.HTTPError as e:
        print(f"FAIL: test_tts_returns_mp3 — HTTP {e.code}: {e.read().decode()}")
        sys.exit(1)


if __name__ == "__main__":
    print("ElevenLabs TTS API Tests")
    print("=" * 40)
    test_api_key_valid()
    test_tts_returns_mp3()
    print("=" * 40)
    print("All tests passed.")
