import React from 'react'

const mockJournals = [
  {
    id: 1,
    title: 'First Journal',
    content:
      'Today was a good day. I went for a walk and enjoyed the fresh air.'
  },
  {
    id: 2,
    title: 'Second Journal',
    content: 'I worked on a React project. It was quite productive.'
  },
  {
    id: 3,
    title: 'Third Journal',
    content: 'Had a long call with an old friend. Nostalgic times.'
  },
  {
    id: 4,
    title: 'Fourth Journal',
    content: 'Learned a new recipe and it turned out great!'
  },
  {
    id: 5,
    title: 'Fifth Journal',
    content: 'Spent the evening reading a fascinating book about stoicism.'
  }
]

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Syrupy</h1>
        <div className="flex items-center">
          <span className="mr-4">Hi, User!</span>
          <button className="rounded bg-blue-500 px-4 py-2 text-white">
            Profile
          </button>
        </div>
      </header>
      <main className="p-8">
        <h2 className="mb-4 text-3xl">Hi, how are you doing?</h2>
        <button className="rounded bg-blue-500 px-6 py-3 text-white shadow hover:bg-blue-600">
          Start Journaling Now
        </button>
        <section className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Your Recent Journals</h3>
          <ul className="space-y-4">
            {mockJournals.map((journal) => (
              <li
                key={journal.id}
                className="cursor-pointer rounded bg-white p-4 shadow hover:bg-gray-50"
              >
                <h4 className="text-lg font-bold">{journal.title}</h4>
                <p className="text-sm text-gray-600">
                  {journal.content.slice(0, 50)}...
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
