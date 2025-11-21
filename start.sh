#!/bin/bash

# Script pour démarrer l'application Irregular Verbs

echo "🚀 Démarrage de l'application Irregular Verbs..."
echo ""

# Vérifier si Python est disponible
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python n'est pas installé."
    echo "Veuillez installer Python 3 pour exécuter ce serveur."
    exit 1
fi

# Obtenir le port (par défaut 8000)
PORT=${1:-8000}

echo "📡 Serveur démarré sur http://localhost:$PORT"
echo "📂 Ouvrez votre navigateur et allez à: http://localhost:$PORT/index.html"
echo ""
echo "⚠️  Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Démarrer le serveur HTTP
$PYTHON_CMD -m http.server $PORT

