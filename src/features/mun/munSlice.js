import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMun = createAsyncThunk(
    "mun/fetchMun",
    async ({ id, selectValue }) => {
        const response = await axios.get(
            import.meta.env.VITE_MUN_URL_MULTI + `&CQL_FILTER=id_bp=${id}`
        );
        const updatedFeatures = response.data.features.map(feature => ({
            ...feature,
            properties: {
                ...feature.properties,
                status: selectValue
            }
        }));
        return { ...response.data, features: updatedFeatures };
    }
);

export const munSlice = createSlice({
    name: "mun",
    initialState: {
        mun: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null
    },
    reducers: {
        removeMun: (state, action) => {
            state.mun = state.mun.filter(mun => mun.properties.id_bp !== action.payload.id);
        },
        removeAllMun: (state) => {
            state.mun = [];
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMun.fulfilled, (state, action) => {
                const newFeatures = action.payload.features;

                // Crear un mapa de los nuevos features por cvegeo para fácil acceso
                const newFeaturesMap = new Map(newFeatures.map(feature => [feature.properties.cvegeo, feature]));
                console.log(newFeaturesMap);

                // Filtrar y reemplazar los valores existentes con los nuevos si el status es mayor
                state.mun = state.mun.map(existingFeature => {
                    const newFeature = newFeaturesMap.get(existingFeature.properties.cvegeo);
                    if (newFeature && newFeature.properties.status > existingFeature.properties.status) {
                        return newFeature;
                    }
                    return existingFeature;
                });

                // Agregar los nuevos valores que no están presentes en los existentes
                newFeatures.forEach(newFeature => {
                    if (!state.mun.some(existingFeature => existingFeature.properties.cvegeo === newFeature.properties.cvegeo)) {
                        state.mun.push(newFeature);
                    }
                });
                state.status = "succeeded";

            })
            .addCase(fetchMun.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchMun.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const getMunData = (state) => state.mun;
export const getMunStatus = (state) => state.mun.status;
export const getMunError = (state) => state.mun.error;

export const { removeMun, removeAllMun } = munSlice.actions;

export default munSlice.reducer;