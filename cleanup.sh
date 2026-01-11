#!/bin/bash

echo "========================================"
echo " Boarding House System - Cleanup Script"
echo "========================================"
echo

echo "Deleting old client folder..."
if [ -d "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/client" ]; then
    rm -rf "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/client"
    echo "  - client folder deleted"
else
    echo "  - client folder not found (skipped)"
fi

echo "Deleting old server folder..."
if [ -d "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/server" ]; then
    rm -rf "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/server"
    echo "  - server folder deleted"
else
    echo "  - server folder not found (skipped)"
fi

echo "Deleting old packages/types folder..."
if [ -d "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/packages/types" ]; then
    rm -rf "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/packages/types"
    echo "  - packages/types folder deleted"
else
    echo "  - packages/types folder not found (skipped)"
fi

echo "Deleting cleanup.bat if exists..."
if [ -f "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/cleanup.bat" ]; then
    rm -f "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/cleanup.bat"
    echo "  - cleanup.bat deleted"
fi

echo "Deleting old folder_structure.md..."
if [ -f "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/folder_structure.md" ]; then
    rm -f "/c/Users/Qwenzy/Desktop/BoardingHouseSystem/folder_structure.md"
    echo "  - folder_structure.md deleted"
fi

echo
echo "========================================"
echo "Cleanup complete!"
echo "========================================"