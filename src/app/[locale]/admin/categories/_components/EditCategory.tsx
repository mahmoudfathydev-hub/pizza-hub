"use client";

import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Languages } from "@/src/constants/enums";
import { CategoriesTranslations } from "@/src/lib/translation";
import { Category } from "@prisma/client";
import { EditIcon } from "lucide-react";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updateCategory } from "../_actions/category";
import Loader from "@/src/components/ui/Loader";
import { toast } from "@/src/hooks/use-toast";

type InitialStateType = {
    message?: string;
    error?: ValidationError;
    status?: number | null;
};
const initialState: InitialStateType = {
    message: "",
    error: {},
    status: null,
};

function EditCategory({
    translations,
    category,
}: {
    translations: CategoriesTranslations;
    category: Category;
}) {
    const { locale } = useParams();
    const [state, action, pending] = useActionState(
        updateCategory.bind(null, category.id),
        initialState,
    );

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.message,
                className: state.status === 200 ? "text-green-400" : "text-destructive",
            });
        }
    }, [state.message, state.status]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <EditIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle
                        className={
                            locale === Languages.ARABIC ? "text-right!" : "text-left!"
                        }
                    >
                        {translations.form.editName}
                    </DialogTitle>
                </DialogHeader>
                <form action={action} className="pt-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="category-name">
                            {translations.form.name.label}
                        </Label>
                        <div className="flex-1 relative">
                            <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                defaultValue={category.name}
                                placeholder={translations.form.name.placeholder}
                            />
                            {state.error?.categoryName && (
                                <p className="text-sm text-destructive absolute top-12">
                                    {state.error?.categoryName}
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="mt-10">
                        <Button type="submit" disabled={pending}>
                            {pending ? <Loader /> : translations.save}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditCategory;
