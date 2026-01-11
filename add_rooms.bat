@echo off
REM Add 10 Rooms to the system via API

setlocal enabledelayedexpansion

for /L %%i in (1,1,10) do (
  echo Adding Room %%i...
  
  curl -X POST http://localhost:5000/api/rooms ^
    -H "Content-Type: application/json" ^
    -d "{ \"room_number\": %%i, \"capacity\": 4, \"room_type\": \"shared\", \"rental_mode\": \"bed-space\", \"monthly_rent\": 600, \"status\": \"Available\", \"boarding_house_id\": 1 }"
  
  echo.
)

echo All rooms added!
