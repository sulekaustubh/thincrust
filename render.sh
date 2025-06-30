#!/bin/bash

# Default output filename
OUTPUT_FILE=${1:-output.mp4}

echo "🎬 Rendering video to $OUTPUT_FILE"

# Run the custom render script
node scripts/render.mjs "$OUTPUT_FILE"

# Check if the render was successful
if [ $? -eq 0 ]; then
    echo "✅ Render complete!"
    echo "📁 Video saved to: $(pwd)/$OUTPUT_FILE"
    
    # Open the file with the default video player (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🎥 Opening video..."
        open "$OUTPUT_FILE"
    fi
else
    echo "❌ Render failed!"
fi 