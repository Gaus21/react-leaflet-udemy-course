import { useEffect, useState } from 'react';
import { booleanPointOnLine } from '@turf/boolean-point-on-line';
import { featureCollection } from '@turf/helpers';

const useSpatialJoin = (points, lines) => {
    const [joinedPoints, setJoinedPoints] = useState(null);

    useEffect(() => {
        if (!points || !lines) {
            setJoinedPoints(null);
            return;
        }

        const performSpatialJoin = (points, lines) => {
            const resultFeatures = [];
            points?.features?.forEach((p) => {
                lines?.features?.forEach((l) => {
                    if (booleanPointOnLine(p, l)) {
                        const mergedProperties = { pid: p.properties.id, lid: l.properties.id, ...l.properties };
                        resultFeatures.push(mergedProperties);
                    }
                });
            });

            return featureCollection(resultFeatures);
        };

        if (points && lines) {
            const result = performSpatialJoin(points, lines);
            setJoinedPoints(result);
        }
    }, [points, lines]);

    return joinedPoints;
};




export default useSpatialJoin;