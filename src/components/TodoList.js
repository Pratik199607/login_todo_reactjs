// import axios from 'axios';
import React from "react";
import { CardComponent } from "./CardComponent";
import { Button } from "flowbite-react";

const TodoList = () => {

    return (
        <div className="mx-auto container max-w-6xl text-center my-14 bg-slate-200 rounded-3xl flex flex-col items-center">
            <input className="rounded-xl mt-5 max-w-screen-sm" type="text" />
            {/* <button className="mt-5 py-2 w-36 rounded-xl bg-purple-600">Create Todo</button> */}
            <Button
                gradientDuoTone="greenToBlue"
                outline
                pill
                className="w-40 mt-5"
            >
                Create Todo
            </Button>
            <CardComponent />
        </div>
    )
};

export default TodoList;