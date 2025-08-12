
const Loading = () => {
  return (
    <div className='bg-white flex justify-center items-center w-screen h-screen relative'>
      <div className="w-42 h-42 rounded-full overflow-hidden flex items-center justify-center">
        <img
          src="https://i.ibb.co/Ld6LSNjq/logo-2.png"
          alt="logo"
          className="w-full h-full object-contain animate-spin-slow"
          style={{ animation: "spin 10s linear infinite" }}
        />
      </div>
    </div>
  )
}

export default Loading
