/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import FormFields from "@/components/form-fields/form-fields";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { MenuItemsTranslations } from "@/lib/translation";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState, useRef } from "react";
import SelectCategory from "./SelectCategory";
import { Category, Extra, Size } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemOptions, { ItemOptionsKeys } from "./ItemOptions";
import Link from "@/components/link";
import { useParams } from "next/navigation";
import { addProduct, deleteProduct, updateProduct } from "../_actions/product";
import Loader from "@/components/ui/Loader";
import { toast } from "@/hooks/use-toast";
import { ProductWithRelation } from "@/types/product";
import { aosAnimations } from "@/utils/aos";
function Form({
  translations,
  categories,
  product,
}: {
  translations: MenuItemsTranslations;
  categories: Category[];
  product?: ProductWithRelation;
}) {
  const [selectedImage, setSelectedImage] = useState(
    product ? product.image : "",
  );
  const [categoryId, setCategoryId] = useState(
    product ? product.categoryId : categories[0].id,
  );
  const [sizes, setSizes] = useState<Partial<Size>[]>(
    product ? product.sizes : [],
  );
  const [extras, setExtras] = useState<Partial<Extra>[]>(
    product ? product.extras : [],
  );
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translations,
  });
  const formData = new FormData();
  Object.entries(product ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  const initialState: {
    message?: string;
    error?: Record<string, string[]>;
    status?: number;
  } = {
    message: "",
    error: {},
    status: undefined,
  };
  const sizesRef = useRef(sizes);
  const extrasRef = useRef(extras);
  const categoryIdRef = useRef(categoryId);

  // Update refs when state changes
  useEffect(() => {
    sizesRef.current = sizes;
    extrasRef.current = extras;
    categoryIdRef.current = categoryId;
  }, [sizes, extras, categoryId]);

  const formAction = async (prevState: any, formData: FormData) => {
    // Capture current field values before submission
    const currentValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      currentValues[key] = value.toString();
    });
    setFieldValues(currentValues);

    const options = { sizes: sizesRef.current, extras: extrasRef.current };
    if (product) {
      return await updateProduct(
        {
          productId: product.id,
          options,
        },
        prevState,
        formData,
      );
    } else {
      return await addProduct(
        {
          categoryId: categoryIdRef.current,
          options,
        },
        prevState,
        formData,
      );
    }
  };
  const [state, action, pending] = useActionState(formAction, initialState);

  // Track field values to preserve them on error
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.status && !pending) {
      const isSuccess = state.status === 201 || state.status === 200;
      toast({
        title: state.message,
        className: isSuccess
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200",
      });

      // Only clear form on success
      if (isSuccess && formRef.current) {
        formRef.current.reset();
        setSelectedImage("");
        setSizes([]);
        setExtras([]);
        setCategoryId(categories[0]?.id || "");
        setFieldValues({});
      }
    }
  }, [pending, state.message, state.status]);
  return (
    <form
      ref={formRef}
      action={action}
      className="flex flex-col md:flex-row gap-10"
      {...aosAnimations.fadeInUp()}
    >
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {state?.error?.image && (
          <p className="text-sm text-destructive text-center mt-4 font-medium">
            {state.error?.image}
          </p>
        )}
      </div>
      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue = formData.get(field.name);
          const hasError = state?.error?.[field.name];

          return (
            <div
              key={field.name}
              className="mb-3"
              {...aosAnimations.fadeInUp()}
            >
              <FormFields
                {...field}
                error={state?.error}
                defaultValue={
                  hasError
                    ? fieldValues[field.name] || ""
                    : (fieldValue as string)
                }
              />
            </div>
          );
        })}
        <div {...aosAnimations.fadeInUp()}>
          <SelectCategory
            categoryId={categoryId}
            categories={categories}
            setCategoryId={setCategoryId}
            translations={translations}
          />
        </div>
        <div {...aosAnimations.fadeInUp()}>
          <AddSize
            translations={translations}
            sizes={sizes}
            setSizes={setSizes}
          />
        </div>
        <div {...aosAnimations.fadeInUp()}>
          <AddExtras
            extras={extras}
            setExtras={setExtras}
            translations={translations}
          />
        </div>
        <div {...aosAnimations.fadeInUp()}>
          <FormActions
            translations={translations}
            pending={pending}
            product={product}
          />
        </div>
      </div>
    </form>
  );
}
export default Form;

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // Client-side validation: Check file size (max 8MB to be safe)
      const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
      if (file.size > MAX_FILE_SIZE) {
        alert(
          `File size must be less than 8MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        );
        event.target.value = ""; // Clear the input
        return;
      }

      // Client-side validation: Check file type
      const ALLOWED_TYPES = [
        "image/jpeg",
        "image/jfif", // Added JFIF support
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(
          "Invalid file type. Only JPEG, JFIF, PNG, GIF, and WebP are allowed.",
        );
        event.target.value = ""; // Clear the input
        return;
      }

      // Clean up previous object URL if it exists
      if (selectedImage && selectedImage.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedImage && selectedImage.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  // Additional cleanup on component unmount
  useEffect(() => {
    return () => {
      // Cleanup any remaining blob URLs when component unmounts
      if (selectedImage && selectedImage.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, []); // Empty dependency array means this runs only on unmount

  return (
    <div className="group mx-auto md:mx-0 relative w-50 h-50 overflow-hidden rounded-full">
      {selectedImage && (
        <Image
          src={selectedImage}
          alt="Add Product Image"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      )}
      <div
        className={`${
          selectedImage
            ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
            : ""
        } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
      >
        <input
          type="file"
          accept="image/jpeg,image/jfif,image/png,image/gif,image/webp"
          className="hidden"
          id="image-upload"
          onChange={handleImageChange}
          name="image"
        />
        <label
          htmlFor="image-upload"
          className="border rounded-full w-50 h-50 element-center cursor-pointer"
          title="Upload image (Max 8MB, JPEG/JFIF/PNG/GIF/WebP)"
        >
          <CameraIcon className="w-8 h-8 text-accent" />
        </label>
      </div>
    </div>
  );
};
const FormActions = ({
  translations,
  pending,
  product,
}: {
  translations: MenuItemsTranslations;
  pending: boolean;
  product?: ProductWithRelation;
}) => {
  const { locale } = useParams();
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });
  const handleDelete = async (id: string) => {
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });
      const res = await deleteProduct(id);
      setState((prev) => {
        return {
          ...prev,
          status: res.status,
          message: res.message || "Unknown operation result",
          pending: false,
        };
      });
    } catch (error) {
      console.error("Delete product error:", error);
      setState((prev) => {
        return {
          ...prev,
          status: 500,
          message: "Failed to delete product",
          pending: false,
        };
      });
    }
  };
  useEffect(() => {
    if (state.message && state.status && !pending) {
      const isSuccess = state.status === 200;
      toast({
        title: state.message,
        className: isSuccess
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200",
      });
    }
  }, [pending, state.message, state.status]);
  return (
    <>
      <div
        className={`${product ? "grid grid-cols-2" : "flex flex-col"} gap-4`}
      >
        <Button type="submit" disabled={pending}>
          {pending ? (
            <Loader />
          ) : product ? (
            translations.save
          ) : (
            translations.create
          )}
        </Button>
        {product && (
          <Button
            variant="outline"
            disabled={state.pending}
            onClick={() => handleDelete(product.id)}
          >
            {state.pending ? <Loader /> : translations.delete}
          </Button>
        )}
      </div>
      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}
        className={`w-full mt-4 ${buttonVariants({ variant: "outline" })}`}
      >
        {translations.cancel}
      </Link>
    </>
  );
};

const AddSize = ({
  sizes,
  setSizes,
  translations,
}: {
  sizes: Partial<Size>[];
  setSizes: React.Dispatch<React.SetStateAction<Partial<Size>[]>>;
  translations: MenuItemsTranslations;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-80 mb-4 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {translations.sizes}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions
            optionKey={ItemOptionsKeys.SIZES}
            state={sizes}
            setState={setSizes}
            translations={translations}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
const AddExtras = ({
  extras,
  setExtras,
  translations,
}: {
  extras: Partial<Extra>[];
  setExtras: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  translations: MenuItemsTranslations;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-80 mb-4 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {translations.extrasIngredients}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions
            state={extras}
            optionKey={ItemOptionsKeys.EXTRAS}
            setState={setExtras}
            translations={translations}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
