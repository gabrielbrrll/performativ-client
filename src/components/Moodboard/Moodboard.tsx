import React, { useEffect, useState } from 'react'

type Emotion = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral'

const generateSampleData = (): Record<
  string,
  { emotion: string; color: string }
> => {
  const emotions = ['happy', 'sad', 'angry', 'anxious', 'neutral']
  const colors = {
    happy: '#32CD32', // Lime green
    sad: '#1E90FF', // Dodger blue
    angry: '#FF4500', // Orange red
    anxious: '#FFD700', // Gold
    neutral: '#D3D3D3' // Light gray
  }
  const data: Record<string, { emotion: string; color: string }> = {}
  const today = new Date()
  const startDate = new Date()
  startDate.setMonth(today.getMonth() - 12)
  startDate.setDate(startDate.getDate() - startDate.getDay())

  for (let d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
    const date = d.toISOString().split('T')[0]
    const randomEmotion = emotions[
      Math.floor(Math.random() * emotions.length)
    ] as Emotion
    data[date] = { emotion: randomEmotion, color: colors[randomEmotion] }
  }

  return data
}

const Moodboard: React.FC = () => {
  const [moodData, setMoodData] = useState<
    Record<string, { emotion: string; color: string }>
  >({})

  useEffect(() => {
    setMoodData(generateSampleData())
  }, [])

  const today = new Date()
  const startDate = new Date()
  startDate.setMonth(today.getMonth() - 12) // Last 12 months
  startDate.setDate(startDate.getDate() - startDate.getDay()) // Align to Sunday (start of the week)

  const weeks: {
    week: { date: string; mood: { emotion: string; color: string } }[]
    month: number
  }[] = []
  let currentWeek: {
    date: string
    mood: { emotion: string; color: string }
  }[] = []
  let currentMonth = startDate.getMonth()

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const date = d.toISOString().split('T')[0]
    const dayMonth = d.getMonth()
    currentWeek.push({
      date,
      mood: moodData[date] || { emotion: 'neutral', color: '#D3D3D3' }
    })

    if (currentWeek.length === 7) {
      weeks.push({ week: currentWeek, month: currentMonth })
      currentWeek = []
      currentMonth = dayMonth
    }
  }

  if (currentWeek.length > 0) {
    weeks.push({ week: currentWeek, month: currentMonth })
  }

  return (
    <div>
      <div className="relative">
        {/* Month Labels */}
        <div className="absolute -top-8 flex gap-0 text-sm font-medium text-gray-500">
          {weeks.map((week, index) =>
            index === 0 || week.month !== weeks[index - 1].month ? (
              <div
                key={index}
                style={{ gridColumnStart: index + 1 }}
                className="w-[102px]"
              >
                {new Date(2024, week.month).toLocaleString('default', {
                  month: 'short'
                })}
              </div>
            ) : null
          )}
        </div>

        {/* Contribution Graph */}
        <div className="grid auto-cols-max grid-flow-col gap-2">
          {weeks.map((week, index) => (
            <div key={index} className="grid grid-rows-7 gap-1">
              {week.week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  title={`${day.date} - ${day.mood.emotion}`}
                  className="size-4 rounded"
                  style={{ backgroundColor: day.mood.color }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Moodboard
