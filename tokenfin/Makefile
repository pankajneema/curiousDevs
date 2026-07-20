.PHONY: dev-ui dev-backend dev install-py install-js

install-js:
	npm install

install-py:
	cd backend && pip install -r requirements.txt

install: install-js install-py

dev-ui:
	npm run dev

dev-backend:
	cd backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload

dev:
	make -j2 dev-ui dev-backend
