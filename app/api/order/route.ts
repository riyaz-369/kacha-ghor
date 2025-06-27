import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // console.log("Received request body:", body);

    // Example: extract orders array
    const { orders } = body;

    const apiKey = "uupyhq4dljlla3nyti2hmqt63odz3fid";
    const secretKey = "zwwdie0s5izcajparphoenf4";

    const response = await axios.post(
      "https://portal.packzy.com/api/v1/create_order/bulk-order",
      {
        data: orders,
      },
      {
        headers: {
          "Api-Key": apiKey,
          "Secret-Key": secretKey,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("Steadfast response:", response.data);

    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error?.response?.data || error);
    return NextResponse.json(
      { error: error?.response?.data || error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
