import { fetchUserUsage } from '$utils/common';

import { init, personaDetectionInit, plansInit } from './dashboard';

const commonInit = () => {
    fetchUserUsage();
};

commonInit();

init();
personaDetectionInit();
plansInit();
