// Import necessary modules
import { NextResponse } from "next/server";
import { Acquisition, PrismaClient } from "@prisma/client";
import { error } from "console";

// There is an existing error where req.body is not being parsed correctly. where req.body contents Undefined in console log check for fix.

// Create an instance of Prisma Client
const prisma = new PrismaClient();

// Define the POST method for the API route
export const config = {
  api: {
    bodyParser: true, // Enable body parsing
  },
};

// Define the POST method for the API route
export const POST = async (req: Request) => {
  try {
    // Extract the required fields from the request body
    const { name, type, quality, variety, quantity, acquisition } =
      await req.json();
    console.log("Request body:", name, type, quality, variety, quantity);

    // Validate the request body
    if (!name || !type || !quantity) {
      return NextResponse.json(
        { error: "Invalid Request Body" },
        { status: 400 }
      );
    }

    // Check if the item already exists in the Item table
    let item = await prisma.item.findFirst({
      where: { Name: { equals: name } },
    });

    if (!item) {
      // If the item doesn't exist, create a new one
      item = await prisma.item.create({
        data: {
          Name: name,
          Type: type,
          Quality: quality,
          Variety: variety,
        },
      });
    }

    // Check if the inventory with the same item ID and acquisition type exists
    const existingInventory = await prisma.inventory.findFirst({
      where: {
        ItemID: { equals: item.ItemID },
        Acquisition: { equals: acquisition as Acquisition },
      },
    });

    if (existingInventory) {
      // If the item exists in the Inventory table with the same Acquisition
      // Update the quantity based on the acquisition type
      if (acquisition === "Bought" || acquisition === "Processed") {
        await prisma.inventory.update({
          where: { InventoryID: existingInventory.InventoryID },
          data: {
            Quantity: existingInventory.Quantity + parseInt(quantity, 10),
          },
        });
      } else {
        // Handle other types of acquisitions here
        console.log("No action taken for acquisition:", acquisition);
      }
    } else {
      // If the item doesn't exist in the Inventory table with the same Acquisition
      // Create a new entry in the Inventory table
      await prisma.inventory.create({
        data: {
          Item: { connect: { ItemID: item.ItemID } },
          Quantity: parseInt(quantity, 10),
          Acquisition: acquisition,
        },
      });
    }

    // Send a success response
    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    // Send an error response
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
};

export const GET = async (res: Response) => {
  try {
    const items = await prisma.inventory.findMany({
      // select: {
      //   Acquisition: true,
      // },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
  }
};
