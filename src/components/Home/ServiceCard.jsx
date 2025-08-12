import doctorHome from "../../assets/doctor-home.jpg"

const ServiceCard = () => {
  return (
    <div>
        <div className="bg-white cursor-pointer rounded-lg overflow-hidden group relative before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-60">
            <img src={doctorHome} alt="Blog Post 1" className="w-full h-96 object-cover group-hover:scale-110 transition-all duration-300" />
            <div className="p-6 absolute bottom-0 left-0 right-0 z-20">
              
              <h3 className="text-xl font-bold text-white">A Guide to Igniting Your Imagination</h3>
              <div className="mt-4">
                <p className="text-gray-200 text-sm ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ServiceCard