import express from 'express';
const router = express.Router();
import { createFacility, getAllFacilities, getFacilityById, updateFacility, deleteFacility } from '../controllers/facility.controller';

router.post('/facilities', createFacility);
router.get('/facilities', getAllFacilities);
router.get('/facilities/:id', getFacilityById);
router.put('/facilities/:id', updateFacility);
router.delete('/facilities/:id', deleteFacility);

export default router;
