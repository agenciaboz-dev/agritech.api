import { NewGallery } from "../definitions/gallery";
import { Gallery, PrismaClient } from "@prisma/client";
import { saveImage } from "../saveImage";
import tillage from "./tillage";

const prisma = new PrismaClient();

const create = async (data: NewGallery) => {
  console.log(data);
  try {
    let urls: string[] = [];

    const uploaded = data.images?.map((file) => {
      saveImage(`gallery`, file.file, file.name);
      return `gallery/${file.name}`;
    });

    if (uploaded) {
      urls = [...uploaded];
    }

    data.urls?.map((url) => urls.push(url));
    console.log({ urls });

    const gallery = await prisma.gallery.create({
      data: {
        images: {
          create: uploaded?.map((item) => ({ url: item })),
        },
        tillageId: data.tillageId,
      },
    });

    console.log("Gallery created:", gallery);
  } catch (error) {
    console.log(error);
  }
};

const update = async (data: NewGallery) => {
  console.log(data);
  try {
    let urls: string[] = [];

    const uploaded = data.images?.map((image) => {
      saveImage(`gallery`, image.file, image.name);
      return `gallery/${image.name}`;
    });

    if (uploaded) {
      urls = [...uploaded];
    }

    data.urls?.map((url) => urls.push(url));
    console.log({ urls });

    const gallery = await prisma.gallery.update({
      where: { tillageId: data.tillageId },
      data: {
        images: {
          create: urls.map((url) => ({ url })),
        },
      },
    });

    console.log("Gallery updated:", gallery);
  } catch (error) {
    console.log(error);
  }
};

const list = async () => {
  return await prisma.gallery.findMany({ include: { images: true } });
};

const remove = async (id: number) =>
  await prisma.gallery.delete({ where: { id } });

export default {
  create,
  update,
  list,
  remove,
};
