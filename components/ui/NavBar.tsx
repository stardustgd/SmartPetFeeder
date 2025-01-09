type NavBar = {
  title?: string
}

export default function NavBar(props: NavBar) {
  return (
    <div className="flex justify-center items-center h-16">
      <h1 className="text-white text-md">
        {props.title || 'Smart Pet Feeder'}
      </h1>
    </div>
  )
}
