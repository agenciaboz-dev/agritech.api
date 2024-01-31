import { NewGallery } from "../definitions/gallery";
import { Gallery, PrismaClient } from "@prisma/client";
import { saveImage } from "../saveImage";

const prisma = new PrismaClient();

const create = async (data: NewGallery) => {
  console.log("Iniciando a criação do galeria...")

  const uploaded = data.images?.map((file) => {
      saveImage(`gallery`, file.file, file.name)
      return `gallery/${file.name}`
  })

  const gallery = await prisma.gallery.create({
      data: {
          images: {
              create: uploaded?.map((item) => ({ url: item })),
          },
          tillageId: data.tillageId,
      },
  })

  console.log("Galeria criada:", gallery);
  return { gallery };
};

const update = async (data: NewGallery) => {
  const existingGallery = await prisma.gallery.findUnique({
    where: { tillageId: data.tillageId },
    include: { images: true },
  });

  if (!existingGallery) {
    throw new Error("Gallery not found");
  }

  // Process new images and update existing ones
  let updatedImages = [];
  if (data.images) {
    for (const img of data.images) {
      saveImage(`gallery`, img.file, img.name);
      const imageUrl = `gallery/${img.name}`;
      updatedImages.push({ url: imageUrl });
    }
  }

  // Prepare the update data
  const updateData = {
    // other fields to update...
    images: {
      // Handle image updates here
    },
  };

  const updatedGallery = await prisma.gallery.update({
    where: { tillageId: data.tillageId },
    data: updateData,
  });

  console.log("Gallery Updated: ", updatedGallery);

  return { gallery: updatedGallery };
};

const list = async () => {
  return await prisma.gallery.findMany({ include: { images: true } });
};

export default {
  create,
  update,
  list,
};
