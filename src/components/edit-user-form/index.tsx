"use client";
import { InputTypes, Routes } from "@/src/constants/enums";
import useFormFields from "@/src/hooks/useFormFields";
import { IFormField } from "@/src/types/app";
import { ProfileTranslations } from "@/src/types/ProfileTranslations";
import { Session } from "next-auth";
import Image from "next/image";
import FormFields from "../form-fields/form-fields";
import { Button } from "../ui/button";
import Loader from "../ui/Loader";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import Checkbox from "../form-fields/checkbox";
import { useActionState, useEffect, useState } from "react";
import { updateProfile } from "./_action/profile";
import { CameraIcon } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
import { useCurrentLocale } from "@/src/hooks/useCurrentLocale";
import getTrans from "@/src/lib/translation";

type ProfileUpdateState = {
    error?: Record<string, string[]>;
    status?: number | null;
    message?: string;
};

function EditUserForm({ user }: { user: Session["user"] }) {
    const session = useSession();
    const locale = useCurrentLocale();
    const [translations, setTranslations] = useState<ProfileTranslations | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(user.image ?? "");
    const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);
    const { toast } = useToast();

    const initialState: ProfileUpdateState = {
        error: {},
        status: null,
        message: "",
    };
    const [state, action, pending] = useActionState<ProfileUpdateState, FormData>(
        updateProfile,
        initialState,
    );
    const fallbackTranslations: ProfileTranslations = {
        title: "",
        save: "",
        form: {
            name: { label: "", placeholder: "" },
            email: { label: "", placeholder: "" },
            phone: { label: "", placeholder: "" },
            address: { label: "", placeholder: "" },
            postalCode: { label: "", placeholder: "" },
            city: { label: "", placeholder: "" },
            country: { label: "", placeholder: "" },
        },
    };

    const { getFormFields } = useFormFields({
        slug: Routes.PROFILE,
        translations: translations || fallbackTranslations,
    });

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const translationsData = await getTrans(locale, "profile");
                setTranslations(translationsData);
            } catch (error) {
                console.error("Failed to load translations:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadTranslations();
    }, [locale]);

    useEffect(() => {
        if (state.message && state.status && !pending) {
            if (state.status === 200) {
                toast({
                    title: state.message,
                    variant: "default",
                    className: "bg-green-50 text-green-700 border border-green-200",
                });
            } else {
                toast({
                    title: state.message,
                    variant: "destructive",
                    className: "bg-red-50 text-red-700 border border-red-200",
                });
            }
        }
    }, [pending, state.message, state.status]);

    if (isLoading || !translations) {
        return <div>Loading...</div>;
    }

    return (
        <form action={action} className="flex flex-col md:flex-row gap-10">
            <input type="hidden" name="isAdmin" value={isAdmin.toString()} />
            <div className="group relative w-50 h-50 overflow-hidden rounded-full mx-auto">
                {selectedImage && (
                    <Image
                        src={selectedImage}
                        alt={user.name}
                        width={200}
                        height={200}
                        className="rounded-full object-cover"
                    />
                )}

                <div
                    className={`${selectedImage
                            ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
                            : ""
                        } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
                >
                    <UploadImage setSelectedImage={setSelectedImage} />
                </div>
            </div>
            <div className="flex-1">
                {getFormFields().map((field: IFormField) => {
                    const fieldValue = user[
                        field.name as keyof Session["user"]
                    ] as string;
                    return (
                        <div key={field.name} className="mb-3">
                            <FormFields
                                {...field}
                                defaultValue={fieldValue}
                                error={state?.error}
                                readOnly={field.type === InputTypes.EMAIL}
                            />
                        </div>
                    );
                })}
                {session.data?.user.role === UserRole.ADMIN && (
                    <div className="flex items-center gap-2 my-4">
                        <Checkbox
                            name="admin"
                            checked={isAdmin}
                            onClick={() => setIsAdmin(!isAdmin)}
                            label="Admin"
                        />
                    </div>
                )}
                <Button type="submit" className="w-full">
                    {pending ? <Loader /> : translations.save}
                </Button>
            </div>
        </form>
    );
}

export default EditUserForm;

const UploadImage = ({
    setSelectedImage,
}: {
    setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
        }
    };
    return (
        <>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
                name="image"
            />
            <label
                htmlFor="image-upload"
                className="border rounded-full w-50 h-50 element-center cursor-pointer"
            >
                <CameraIcon className="w-8! h-8! text-accent" />
            </label>
        </>
    );
};
