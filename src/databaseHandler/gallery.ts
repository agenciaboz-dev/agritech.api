import { NewGallery } from "../definitions/gallery";
import { Gallery, PrismaClient } from "@prisma/client";
import { saveImage } from "../saveImage";

const prisma = new PrismaClient();

const create = async (data: NewGallery) => {
  console.log("Iniciando a criação do galeria...");
  let galleryImageCreateInputs = [];

  if (data.images) {
    for (const img of data.images) {
      saveImage(`gallery`, img.file, img.name);
      const imageUrl = `gallery/${img.name}`;
      galleryImageCreateInputs.push({ url: imageUrl });
    }
  }

  const gallery = await prisma.gallery.create({
    data: {
      images: {
        create: galleryImageCreateInputs, // Create GalleryImage records
      },
      tillageId: data.tillageId,
    },
  });

  console.log("Galeria criada:", gallery);
  return { gallery };
};

// const update = async (data: Gallery) => {
//   const gallery = await prisma.gallery.update({
//     where: { tillageId: data.tillageId },
//     data: {
//       images: data.image,
//     },
//   });
//   console.log("Image Update: ", data);

//   return { gallery };
// };

// const list = async () => {
//   return await prisma.gallery.findMany({});
// };

export default {
  create,
  // update,
  // list,
};
