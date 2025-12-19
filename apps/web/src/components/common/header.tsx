// import { Button } from "../ui/button"
// import { ListFilter, LogOut } from "lucide-react"

import ModalAddTask from "./tasks/modal-add-task"
import ModalLogout from "./auth/modal-logout"

//onClick={handleClickBtnLogout}
export default function Header() {
  return (
    <div className="flex relative grow items-center justify-between w-[calc(100%-23px)] h-auto py-3 gap-1 px-4 mb-3">
      <div className="w-12 h-12">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvXEvcSR5BLQvKv0SPG3e8ko93kQ88W5qwIg&s" alt="icon react" className="w-full h-full object-cover" />
      </div>

      <div className="flex gap-2 items-center justify-center">
        <ModalAddTask/>

        {/* <Button className="cursor-pointer hover:opacity-75">
          <ListFilter />
          Aplicar filtros
        </Button> */}

        <ModalLogout/>
      </div>
    </div>
  )
}
