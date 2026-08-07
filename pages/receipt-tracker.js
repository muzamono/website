import Link from 'next/link';

export default function receipttracker() {
  return (
    <div style={{ 
      background: 'linear-gradient(225deg, #0e141b 0%, #0e141b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <header style={{
        background: 'linear-gradient(90deg, #0e141b 0%, #0d1824 100%)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold" style={{ color: '#667eea' }}>
            muzamono
          </Link>
          <ul className="flex space-x-8">
            <li><Link href="/#about" className="text-white hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link href="/projects" className="text-white hover:text-blue-400 transition-colors">Projects</Link></li>
            <li><Link href="/blog" className="text-white hover:text-blue-400 transition-colors">Blog</Link></li>
            <li><Link href="/#photos" className="text-white hover:text-blue-400 transition-colors">Photos</Link></li>
            <li><Link href="/#contact" className="text-white hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4" style={{ marginTop: '80px' }}>
        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Receipt Tracker
          </h2>
          <p className="text-lg leading-relaxed" style={{ opacity: 0.9 }}>
          Full stack expense tracking app with a mobile first interface. FastAPI backend, PostgreSQL database, React frontend with monthly breakdowns and CSV export. AI based receipt parsing is in progress.
          </p>
        </section>

        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {['FastAPI', 'PostgreSQL', 'Docker', 'React'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-full text-lg font-medium"
                style={{ background: '#667eea', color: 'white' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Features
          </h2>
          <ul className="space-y-3 text-lg">
            <li style={{ opacity: 0.9 }}>• Frontend with intuitive UI for expenses input </li>
            <li style={{ opacity: 0.9 }}>• Data stored in backend (PostgreSQL)</li>
            <li style={{ opacity: 0.9 }}>• Future updates to include direct tracking through images of receipt</li>
          </ul>
        </section>

        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Code Snippet
          </h2>
          <div 
            className="rounded-lg p-6 overflow-x-auto"
            style={{ background: '#030a2e' }}
          >
            <pre>
              <code className="text-green-400">
{`import csv
import io
import shutil
from uuid import uuid4
from pathlib import Path
from typing import List, Optional
from datetime import date

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from sqlalchemy import extract
from sqlalchemy.orm import Session
from PIL import Image
import pillow_heif

from database import get_db
from models import Expense, Category, Receipt, PaymentType
from schemas import (
    ExpenseCreate, ExpenseResponse,
    CategoryResponse, CategoryCreate,
    PaymentTypeResponse, PaymentTypeCreate,
    ReceiptResponse
)

pillow_heif.register_heif_opener()

app = FastAPI(title="Receipt Tracker")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path(__file__).parent.parent / "data" / "receipts"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app.mount("/receipt-images", StaticFiles(directory=str(UPLOAD_DIR)), name="receipt-images")


@app.get("/")
def root():
    return {"status": "running"}


@app.get("/categories", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()


@app.post("/categories", response_model=CategoryResponse)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    record = Category(name=category.name, color=category.color)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@app.put("/categories/{category_id}", response_model=CategoryResponse)
def update_category(category_id: int, category: CategoryCreate, db: Session = Depends(get_db)):
    record = db.query(Category).filter(Category.id == category_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Category not found")
    record.name = category.name
    record.color = category.color
    db.commit()
    db.refresh(record)
    return record


@app.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    record = db.query(Category).filter(Category.id == category_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(record)
    db.commit()
    return {"deleted": category_id}


@app.get("/payment-types", response_model=List[PaymentTypeResponse])
def get_payment_types(db: Session = Depends(get_db)):
    return db.query(PaymentType).all()


@app.post("/payment-types", response_model=PaymentTypeResponse)
def create_payment_type(payment_type: PaymentTypeCreate, db: Session = Depends(get_db)):
    record = PaymentType(name=payment_type.name)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@app.put("/payment-types/{payment_type_id}", response_model=PaymentTypeResponse)
def update_payment_type(payment_type_id: int, payment_type: PaymentTypeCreate, db: Session = Depends(get_db)):
    record = db.query(PaymentType).filter(PaymentType.id == payment_type_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Payment type not found")
    record.name = payment_type.name
    db.commit()
    db.refresh(record)
    return record


@app.delete("/payment-types/{payment_type_id}")
def delete_payment_type(payment_type_id: int, db: Session = Depends(get_db)):
    record = db.query(PaymentType).filter(PaymentType.id == payment_type_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Payment type not found")
    db.delete(record)
    db.commit()
    return {"deleted": payment_type_id}


@app.post("/receipts/upload", response_model=ReceiptResponse)
def upload_receipt(file: UploadFile = File(...), db: Session = Depends(get_db)):
    ext = Path(file.filename).suffix.lower()
    file_id = str(uuid4())

    if ext == ".heic":
        image = Image.open(file.file)
        filename = f"{file_id}.jpg"
        image.save(UPLOAD_DIR / filename, "JPEG")
    else:
        filename = f"{file_id}{ext}"
        with open(UPLOAD_DIR / filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    record = Receipt(file_name=file.filename, file_path=filename, status="pending")
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@app.post("/expenses", response_model=ExpenseResponse)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    record = Expense(**expense.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@app.get("/expenses", response_model=List[ExpenseResponse])
def get_expenses(db: Session = Depends(get_db)):
    return db.query(Expense).order_by(Expense.expense_date.desc()).all()


@app.get("/expenses/export/csv")
def export_expenses_csv(year: Optional[int] = None, month: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Expense)

    if year is not None and month is not None:
        query = query.filter(
            extract('year', Expense.expense_date) == year,
            extract('month', Expense.expense_date) == month + 1
        )
        month_name = date(year, month + 1, 1).strftime("%B")
        filename = f"{month_name}-{year}-expenses.csv"
    else:
        filename = "receipt-tracker-expenses.csv"

    expenses = query.order_by(Expense.expense_date.desc()).all()
    categories = {c.id: c.name for c in db.query(Category).all()}
    payment_types = {p.id: p.name for p in db.query(PaymentType).all()}

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Date", "Merchant", "Category", "Payment Type", "Amount", "Currency", "Notes"])

    for e in expenses:
        writer.writerow([
            e.expense_date,
            e.merchant or "",
            categories.get(e.category_id, ""),
            payment_types.get(e.payment_type_id, ""),
            e.total_amount,
            e.currency,
            e.notes or ""
        ])

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


@app.get("/expenses/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: int, db: Session = Depends(get_db)):
    record = db.query(Expense).filter(Expense.id == expense_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Expense not found")
    return record


@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    record = db.query(Expense).filter(Expense.id == expense_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(record)
    db.commit()
    return {"deleted": expense_id}


@app.put("/expenses/{expense_id}", response_model=ExpenseResponse)
def update_expense(expense_id: int, expense: ExpenseCreate, db: Session = Depends(get_db)):
    record = db.query(Expense).filter(Expense.id == expense_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Expense not found")
    for key, value in expense.model_dump().items():
        setattr(record, key, value)
    db.commit()
    db.refresh(record)
    return record`}
              </code>
            </pre>
          </div>
        </section>

        <section className="text-center py-8">
          <Link 
            href="/projects" 
            className="inline-block px-6 py-3 rounded font-medium transition-all hover:transform hover:-translate-y-1"
            style={{ 
              background: '#4759a9',
              color: 'white'
            }}
          >
            ← Back to Projects
          </Link>
        </section>
      </main>
    </div>
  );
}