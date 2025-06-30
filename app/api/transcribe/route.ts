import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const audioFile = formData.get("file") as File;
		const language = (formData.get("language") as string) || "english";
		const speakerLabels = formData.get("speaker_labels") === "true";
		const prompt = (formData.get("prompt") as string) || "";
		const translate = formData.get("translate") === "true";

		// Check if file exists
		if (!audioFile) {
			return NextResponse.json(
				{ error: "No audio file provided" },
				{ status: 400 }
			);
		}

		// Create a new FormData object for the API request
		const apiFormData = new FormData();
		apiFormData.append("file", audioFile);
		apiFormData.append("language", language);
		apiFormData.append("response_format", "verbose_json");

		// Add optional parameters if provided
		if (speakerLabels) apiFormData.append("speaker_labels", "true");
		if (prompt) apiFormData.append("prompt", prompt);
		if (translate) apiFormData.append("translate", "true");

		// Add timestamp granularity for word-level timestamps
		apiFormData.append("timestamp_granularities[]", "word");

		// Make request to Lemonfox API
		const response = await fetch(
			"https://api.lemonfox.ai/v1/audio/transcriptions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.LEMONFOX_API_KEY}`,
				},
				body: apiFormData,
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			return NextResponse.json(
				{ error: `API request failed: ${errorText}` },
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Transcription error:", error);
		return NextResponse.json(
			{ error: `Failed to process transcription: ${error.message}` },
			{ status: 500 }
		);
	}
}
