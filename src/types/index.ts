import {z} from 'astro:content'

const ImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const FeaturedImageSchema = z.object({
  thumbnail: ImageSchema,
  medium: ImageSchema,
  medium_large: ImageSchema,
  large: ImageSchema,
  full: ImageSchema
});

const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    acf: z.object({
        icon: z.string()
    })
})
export const CategoriesSchema = z.array(CategorySchema)

export type Category = z.infer<typeof CategorySchema>

const ProductSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
        rendered: z.string()
    }),
    featured_media: z.number(),
    featured_images:  FeaturedImageSchema
})

export const ProductsSchema = z.array(ProductSchema)
export type Product = z.infer<typeof ProductSchema>