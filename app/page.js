import TicketCard from "./(components)/TicketCard"

const page = () => {
  return (
    <div className="p-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
      <TicketCard/>
      </div>
      </div>
  )
}

export default page
