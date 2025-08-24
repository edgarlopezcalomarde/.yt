import { v4 } from "uuid";
import { Pencil, X } from "lucide-react";
import { useLiveQuery } from "@tanstack/react-db";
import { queryTodoCollection } from "./lib/collection";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";
import FloatingPanelInput from "./components/floating-panel-input";
import PopoverInput from "./components/popover-input";

function App() {
  const {
    data: todos,
    isLoading,
    isError,
    status,
  } = useLiveQuery((q) =>
    q
      .from({ todo: queryTodoCollection })
      .orderBy(({ todo }) => todo.createdAt, "asc")
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {status}</div>;

  return (
    <div className="flex border h-screen p-2 gap-2 bg-gray-100 overflow-hidden">
      <div className="w-[20%] border p-2 rounded shadow bg-gray-50">
        <FloatingPanelInput
          onSubmit={(note: string) => {
            queryTodoCollection.insert({
              text: note,
              createdAt: new Date(),
              udpatedAt: new Date(),
              completed: false,
              id: v4(),
            });
            console.log(note);
          }}
        />
      </div>
      <ul className="flex w-full h-full flex-col border rounded shadow p-2 bg-gray-50 gap-2">
        {todos.map((t) => {
          return (
            <li
              key={t.id}
              className={cn(
                "flex border rounded-lg justify-between p-4 items-center",
                {
                  "border-green-600": t.completed,
                }
              )}
            >
              <div className="font-semibold">{t.text}</div>

              <div className="flex gap-2">
                <PopoverInput
                  icon={<Pencil className="w-4 h-4" />}
                  onSubmit={(note) => {
                    console.log(note);
                    queryTodoCollection.update(t.id, (draft) => {
                      draft.text = note;
                      draft.createdAt = new Date();
                      draft.udpatedAt = new Date();
                    });
                  }}
                  title="Editar Nota"
                />

                <Button
                  className="cursor-pointer"
                  onClick={() => queryTodoCollection.delete(t.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
