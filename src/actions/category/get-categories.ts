'use server';

import prisma from '@/lib/prisma';
import { Amount } from '../../interfaces/paypal.interface';



export const getCategories = async () => {

  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });


    return categories;



  } catch (error) {
    console.log(error);
    return [];
  }


}