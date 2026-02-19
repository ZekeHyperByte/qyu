#!/bin/bash

# Create webp directory
mkdir -p /home/qiu/Work/Web\ Portfolio/static/images/webp

echo "Converting PNG images to WebP format..."
echo "Quality: 85% (balanced)"
echo ""

# Counter for progress
total=41
current=0

# Convert each PNG to WebP (3-digit format: 001, 002, etc.)
for i in $(seq -f "%03g" 1 41); do
    input_file="/home/qiu/Work/Web Portfolio/static/images/qyu-${i}.png"
    output_file="/home/qiu/Work/Web Portfolio/static/images/webp/qyu-${i}.webp"
    
    if [ -f "$input_file" ]; then
        current=$((current + 1))
        echo "[$current/$total] Converting qyu-${i}.png -> qyu-${i}.webp"
        
        # Convert with 85% quality
        convert "$input_file" -quality 85 "$output_file"
        
        # Show size comparison
        original_size=$(du -h "$input_file" | cut -f1)
        webp_size=$(du -h "$output_file" | cut -f1)
        echo "    Original: $original_size -> WebP: $webp_size"
    else
        echo "Warning: $input_file not found, skipping..."
    fi
done

echo ""
echo "✅ Conversion complete!"
echo ""
echo "WebP images saved to: static/images/webp/"

# Show total size comparison
echo ""
echo "Size comparison:"
echo "Original PNGs total:"
du -shc /home/qiu/Work/Web\ Portfolio/static/images/qyu-*.png | grep total
echo ""
echo "Compressed WebPs total:"
du -sh /home/qiu/Work/Web\ Portfolio/static/images/webp/
