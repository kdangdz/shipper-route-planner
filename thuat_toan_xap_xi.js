function nearestNeighbor(points, startIndex = 0) {
    if (!Array.isArray(points) || points.length === 0) {
        return [];
    }

    if (
        startIndex < 0 ||
        startIndex >= points.length
    ) {
        throw new Error("startIndex không hợp lệ");
    }

    const visited = new Array(points.length).fill(false);
    const route = [];

    let currentIndex = startIndex;

    visited[currentIndex] = true;
    route.push(currentIndex);

    while (route.length < points.length) {
        let nearestIndex = -1;
        let minDistance = Infinity;

        for (let i = 0; i < points.length; i++) {
            if (visited[i]) {
                continue;
            }

            const dx = points[currentIndex].x - points[i].x;
            const dy = points[currentIndex].y - points[i].y;

            // Không cần Math.sqrt vì chỉ cần so sánh khoảng cách
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < minDistance) {
                minDistance = distanceSquared;
                nearestIndex = i;
            }
        }

        if (nearestIndex === -1) {
            break;
        }

        visited[nearestIndex] = true;
        route.push(nearestIndex);

        currentIndex = nearestIndex;
    }

    return route;
}