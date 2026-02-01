"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteUser } from "../action/user";
import { toast } from "@/hooks/use-toast";
import { DeleteState, DeleteUserButtonProps } from "../types";

function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [state, setState] = useState<DeleteState>({
    pending: false,
    status: null,
    message: "",
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setState((prev) => ({ ...prev, pending: true }));
      const res = await deleteUser(id);
      setState((prev) => ({
        ...prev,
        status: res.status,
        message: res.message,
      }));
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Delete user error:", error);
      setState((prev) => ({
        ...prev,
        status: 500,
        message: "Failed to delete user. Please try again.",
      }));
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
      toast({
        title: state.message,
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [state.pending, state.message, state.status]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={state.pending}
        onClick={() => setShowConfirmDialog(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={state.pending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(userId)}
                disabled={state.pending}
              >
                {state.pending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteUserButton;
