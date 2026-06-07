from .db import engine, Base
from .models import Fact

def create_tables():
    Base.metadata.create_all(bind=engine) #saare tables create krega sqlite k andar..
