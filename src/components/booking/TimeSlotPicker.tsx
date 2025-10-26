import React, { useState } from "react";

interface TimeSlotPickerProps {
  tutorId: string;
  onSlotSelect: (slot: any) => void;
  selectedSlot?: any;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  tutorId,
  onSlotSelect,
  selectedSlot,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date && selectedTime) {
      onSlotSelect({
        date,
        startTime: selectedTime,
        endTime: selectedTime,
        duration: 60,
      });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setSelectedTime(time);
    if (selectedDate && time) {
      onSlotSelect({
        date: selectedDate,
        startTime: time,
        endTime: time,
        duration: 60,
      });
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Select Time Slot</h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time
        </label>
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {selectedDate && selectedTime && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            Selected: {selectedDate} at {selectedTime} (60 minutes)
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
