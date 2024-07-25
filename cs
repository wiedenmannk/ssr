#!/bin/bash

# wcc = workspace create component
# Script zum Anlegen von Komponenten in einem Workspace
# Überprüfen, ob mindestens zwei Argumente (App-Name und Component-Name) übergeben wurden
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <component-name>"
  exit 1
fi

# Argumente zuweisen
SERVICE_NAME=$1

# Pfad zum Angular Workspace (kann bei Bedarf angepasst werden)
WORKSPACE_PATH=$(pwd)

# Ins Workspace-Verzeichnis wechseln
cd "$WORKSPACE_PATH" || { echo "Workspace not found!"; exit 1; }

# Angular CLI verwenden, um die Komponente ohne Stylesheets und Tests zu erstellen
ng g service "$SERVICE_NAME" --skip-tests

echo "ng g service $SERVICE_NAME --skip-tests"
echo "Service $SERVICE_NAME created without stylesheets and tests."
