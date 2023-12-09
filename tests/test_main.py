"""Tests for `main.py`."""

import base64

from PIL import Image

from fastapi import HTTPException, UploadFile

import pytest

import app.library
import app.main

document_directory = "tests/data/Document.pdf"
docx_directory = "tests/data/doctest.docx"
image_directory = "tests/data/test.png"
image_content = "G Search with Google or enter address\n"


def is_similar(str1: str, str2: str) -> bool:
    """Check whether the first 10 characters of two strings match."""
    """Because MP3 generation is non-deterministic"""
    return str1[:10] == str2[:10]


def test_root() -> None:
    """Test the entrypoint's return message."""
    assert app.main.root() == {"message": "Hello, world!"}


def test_make_text_and_mp3_response() -> None:
    """Test that the make_text_and_mp3_response returns an error."""
    response = app.library.make_text_and_mp3_response("")
    assert response["text"] == "Error: no text detected."
    assert "mp3" in response


def test_convert_image_to_text() -> None:
    """Test that the image can be converted."""
    assert (
        app.library.convert_image_to_text(Image.open(image_directory))
        == image_content
    )


def test_image() -> None:
    """Test that the image can be converted."""
    with open("tests/data/image.mp3", "rb") as mp3_file:
        binary = mp3_file.read()
        mp3 = base64.b64encode(binary).decode()

        with open("tests/data/test.png", "rb") as f:
            response = app.main.image(
                UploadFile(
                    filename="test.png", file=f, content_type="image/png"
                )
            )

            assert response["text"] == image_content
            assert is_similar(response["mp3"], mp3)


def test_image_failure() -> None:
    """Invalid image raises an HTTP Exception."""
    with open(image_directory, "rb") as f:
        with pytest.raises(HTTPException):
            app.main.image(UploadFile(filename="test.png", file=f))


def test_tts_from_pdf_to_mp3() -> None:
    """Checks that PDF TTS works."""
    with open("tests/data/pdf.mp3", "rb") as f:
        binary = f.read()
        mp3 = base64.b64encode(binary).decode()

        assert is_similar(
            app.library.tts_to_mp3(
                app.library.convert_pdf_to_text(document_directory)
            ),
            mp3,
        )


def test_convert_docx_to_plain_text() -> None:
    """Checks PDF is converted to text."""
    assert (
        app.library.convert_docx_to_plain_text(docx_directory)
        == "This is a test for a .docx file."
    )


def test_docx() -> None:
    """Test that the docx can be converted."""
    with open("tests/data/docx.mp3", "rb") as mp3_file:
        binary = mp3_file.read()
        mp3 = base64.b64encode(binary).decode()

        with open(docx_directory, "rb") as f:
            response = app.main.docx(
                UploadFile(
                    filename="doctest.docx",
                    file=f,
                    content_type="doctest/docx",
                )
            )

            assert response["text"] == app.library.convert_docx_to_plain_text(
                docx_directory
            )
            assert is_similar(response["mp3"], mp3)


def test_pdf() -> None:
    """Test that the PDF can be converted."""
    with open(document_directory, "rb") as f:
        with open("tests/data/pdf.mp3", "rb") as pdf_file:
            binary = pdf_file.read()
            mp3 = base64.b64encode(binary).decode()

            response = app.main.pdf(
                UploadFile(
                    filename="Document.pdf",
                    file=f,
                    content_type="Document/pdf",
                )
            )

            assert response["text"] == app.library.convert_pdf_to_text(
                document_directory
            )
            assert is_similar(response["mp3"], mp3)


def test_pdf_to_text() -> None:
    """Test that the PDF can be converted."""
    assert (
        app.library.convert_pdf_to_text(document_directory)
        == "This is a test for a PDF file.  "
    )


def test_text() -> None:
    """Test that plain text can be converted into a .mp3 file."""
    test = (
        "The Union of Soviet Socialist Republics was"
        "proclaimed on December 30th, 1922."
    )
    with open("tests/data/text.mp3", "rb") as f:
        binary = f.read()
        mp3 = base64.b64encode(binary).decode()

        response = app.main.text(test)

        assert response["text"] == test
        assert is_similar(response["mp3"], mp3)


def test_url() -> None:
    """Test that website text can be parsed and converted to a .mp3 file."""
    example = (
        "https://www.marxists.org/reference/"
        "archive/stalin/works/1945/05/09v.htm"
    )

    with open("tests/data/url.mp3", "rb") as f:
        binary = f.read()
        mp3 = base64.b64encode(binary).decode()

        response = app.main.url(example)
        assert response["text"] == app.library.convert_website_text(example)
        assert is_similar(response["mp3"], mp3)
