from io import BytesIO
from typing import Iterable

import pdfplumber
from pypdf import PdfReader, PdfWriter


def extract_text(file_bytes: bytes) -> str:
    with pdfplumber.open(BytesIO(file_bytes)) as pdf:
        return "\n".join((page.extract_text() or "") for page in pdf.pages)


def merge_pdfs(pdf_streams: Iterable[bytes]) -> bytes:
    writer = PdfWriter()
    for stream in pdf_streams:
        reader = PdfReader(BytesIO(stream))
        for page in reader.pages:
            writer.add_page(page)
    output = BytesIO()
    writer.write(output)
    return output.getvalue()


def split_pdf(file_bytes: bytes, page_number: int) -> tuple[bytes, bytes]:
    reader = PdfReader(BytesIO(file_bytes))
    left_writer, right_writer = PdfWriter(), PdfWriter()
    for i, page in enumerate(reader.pages):
        (left_writer if i < page_number else right_writer).add_page(page)
    left, right = BytesIO(), BytesIO()
    left_writer.write(left)
    right_writer.write(right)
    return left.getvalue(), right.getvalue()
