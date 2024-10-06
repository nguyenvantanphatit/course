'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

type ProgressData = {
  lessonId: string
  completed: boolean
  quizScore: number
  timeSpent: number
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
})

const ProgressReport = ({ progressData }: { progressData: ProgressData[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Learning Progress Report</Text>
        {progressData.map((data, index) => (
          <View key={index}>
            <Text style={styles.text}>Lesson {data.lessonId}:</Text>
            <Text style={styles.text}>Completed: {data.completed ? 'Yes' : 'No'}</Text>
            <Text style={styles.text}>Quiz Score: {data.quizScore}%</Text>
            <Text style={styles.text}>Time Spent: {data.timeSpent} minutes</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

export default function ProgressDashboard() {
  const { user } = useAuth()
  const [progressData, setProgressData] = useState<ProgressData[]>([])

  useEffect(() => {
    // In a real app, fetch this data from an API
    const mockProgressData: ProgressData[] = [
      { lessonId: '1', completed: true, quizScore: 80, timeSpent: 45 },
      { lessonId: '2', completed: true, quizScore: 90, timeSpent: 30 },
      { lessonId: '3', completed: false, quizScore: 0, timeSpent: 15 },
      { lessonId: '4', completed: false, quizScore: 0, timeSpent: 0 },
      { lessonId: '5', completed: false, quizScore: 0, timeSpent: 0 },
    ]
    setProgressData(mockProgressData)
  }, [])

  const chartData = {
    labels: progressData.map(data => `Lesson ${data.lessonId}`),
    datasets: [
      {
        label: 'Quiz Score',
        data: progressData.map(data => data.quizScore),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Time Spent (minutes)',
        data: progressData.map(data => data.timeSpent),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Learning Progress',
      },
    },
  }

  const completedLessons = progressData.filter(data => data.completed).length
  const totalLessons = progressData.length
  const averageQuizScore = progressData.reduce((sum, data) => sum + data.quizScore, 0) / totalLessons

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Progress Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Completed Lessons</h2>
          <p className="text-3xl font-bold">{completedLessons} / {totalLessons}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Average Quiz Score</h2>
          <p className="text-3xl font-bold">{averageQuizScore.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Time Spent</h2>
          <p className="text-3xl font-bold">{progressData.reduce((sum, data) => sum + data.timeSpent, 0)} minutes</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <Bar options={options} data={chartData} />
      </div>
      <div className="text-center">
        {/* <PDFDownloadLink document={<ProgressReport progressData={progressData} />} fileName="progress_report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Generating PDF...' : (
              <a href={url} download="progress_report.pdf" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download Progress Report
              </a>
            )
          }
        </PDFDownloadLink> */}
      </div>
    </div>
  )
}