#!/bin/bash

# Überprüfen, ob das Zielverzeichnis existiert, und erstellen, falls nicht
if [ ! -d "dist/test" ]; then
  mkdir -p dist/test
fi

# Dateien kopieren
cp test/pdfBase64.txt dist/test/
cp test/*.xml dist/test/  # Beispiel für eine XML-Datei

echo "Testdateien wurden erfolgreich in den dist/test-Ordner kopiert."
