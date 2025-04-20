import { useState } from "react";
import { Modal } from "./modal";
import { ModalInputForm } from "./modal-input-form";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addClicked: (category: string, callback: (error?: any) => void) => void;
}

export const AddCategoryForm = ({addClicked}: Props) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [category, setCategory] = useState<string | undefined>();
  const [saveError, setSaveError] = useState<string| undefined>();
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowAddCategory(false);
    setValidationError(false);
    setCategory(undefined);
    setSaveError(undefined);
    setLoading(false);
  };

  const categoryUpdated = (value: string) => {
    setCategory(value);
    setValidationError(!value || value.trim().length === 0);
  };

  const handleAddClicked = (e: React.FormEvent) => {
    e.stopPropagation(); 
    e.preventDefault();
    setLoading(true);
    setSaveError(undefined);

    addClicked(category!.trim(), error => {
      if (!error) {
        closeModal();
      } else {
        setLoading(false);
        setSaveError('message' in error ? error.message : 'Something went wrong, try again.');
        console.log('Failed to add category:', error);
      }
    });
  };

  return (
    <div className="flex" style={{ width: "1000px" }} >
      <div className="uppercase text-xl font-semibold text-center z-1" style={{ writingMode: "sideways-lr" }}>
        &nbsp;
      </div>
      <div className="relative overflow-x-auto whitespace-nowrap py-2 ml-4">
        <div className="flex flex-nowrap py-2">
          <div className="flex-shrink-0">
            <div 
              onClick={() => setShowAddCategory(true)}
              className="relative w-36 h-40 rounded-l-2xl overflow-hidden shadow-lg group cursor-pointer flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-800 to-transparent transition duration-300"></div>
              <div className="relative z-10 text-white text-5xl font-light group-hover:scale-110 transition-transform duration-300">
                +
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        showAddCategory && <Modal visible={showAddCategory} onClose={closeModal}>
          <div className="text-xl font-semibold pt-2 pb-2">Add Category</div>
          { saveError && <div className="mb-2 text-sm text-red-500">{saveError}</div> }

          <form onSubmit={handleAddClicked}>
            <ModalInputForm
              autoFocus
              setValue={categoryUpdated}
              value={category}
              placeholder="Enter Category name"
              errorMessage={
                validationError ? "Please enter a valid category name." : undefined
              }
            />

            <button
              className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-md transition cursor-pointer font-semibold mt-4 min-w-24 float-right disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
              disabled={validationError || loading}>
              { loading ? 'Adding..' : 'Add' }
            </button>
          </form>
        </Modal>
      }
    </div>
  );
};
