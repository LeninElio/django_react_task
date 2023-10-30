// TODO: react-hook-form nos permite validar y extraer los datos de un formulario
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';


export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea actualizada correctamente.", {
        duration: 4000,
        position: 'bottom-right',
      });
    } else {
      await createTask(data);
      toast.success("Tarea creada correctamente.", {
        duration: 4000,
        position: 'bottom-right',
      });
    }
    navigate("/");
  });

  useEffect(() => {
    async function loadTask(){
      if (params.id) {
        const {data} = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
      }
    }
    loadTask();
  });

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Nombre de la tarea..."
          {...register("title", { required: true })}
          className="bg-zinc-800 p-3 rounded-lg w-full block mb-3"
        />
        {errors.title && <span>El titulo es requerido</span>}
        <textarea
          rows="3"
          id="description"
          placeholder="Descripcion de la tarea..."
          {...register("description", { required: true })}
          className="bg-zinc-800 p-3 rounded-lg w-full block mb-3"
        />
        {errors.description && <span>La descripcion es requerida</span>}
        <button type="submit" className="bg-indigo-500 p-3 rounded-lg block w-full mt-3" >Create</button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
         className="bg-red-500 p-3 rounded-lg w-48 mt-3"
          onClick={async () => {
            const accept = window.confirm(
              "¿Estas seguro de eliminar esta tarea?"
            );
            if (accept) {
              await deleteTask(params.id);
              toast.success("Tarea eliminada correctamente.", {
                duration: 4000,
                position: 'bottom-right',
              });
              navigate("/");
            }
          }}
        >
          Eliminar
        </button>
        </div>
      )}
    </div>
  );
}
