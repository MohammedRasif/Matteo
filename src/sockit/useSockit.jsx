import { useEffect, useRef } from "react";
import { BaseUrl } from "../component/Shared/baseUrls";

const useSocket = () => {
	const ws = useRef(null);

	useEffect(() => {
		// Connect to your WebSocket URL
		ws.current = new WebSocket(
			`${BaseUrl}/ws/api/v1/notification/subscribe/`
		);

		ws.current.onopen = () => {
			console.log("✅ WebSocket connected");
		};

		ws.current.onmessage = (event) => {
			console.log("📨 New message from server:", event.data);
		};

		ws.current.onerror = (error) => {
			console.error("❌ WebSocket error:", error);
		};

		ws.current.onclose = () => {
			console.log("🔌 WebSocket closed");
		};

		// Cleanup on unmount
		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, []);

	return ws;
};

export default useSocket;
