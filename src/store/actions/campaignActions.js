export const createProject = (project) => {
  // returning a function which is halting a dispatch
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .doc("fundraisers")
      .collection(project.category)
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const saveCampaignFor = (values, condition) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "SAVE_CAMPAIGN_FOR", values, condition });
  };
};

export const saveCauseDetails = (values, condition) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "SAVE_CAUSE_DETAILS", values, condition });
  };
};

export const saveElaborateCause = (values) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const campaign = getState().campaign;
    let campaignFor = {};
    let causeDetails = {};

    // campaignFor
    if (campaign.campaignFor == "Myself") {
      const {
        myselfFirstName,
        myselfLastName,
        myselfAge,
        myselfGender,
      } = campaign;
      campaignFor = {
        myselfFirstName,
        myselfLastName,
        myselfAge,
        myselfGender,
      };
    } else if (campaign.campaignFor == "Project") {
      const {
        projectOrganiserName,
        projectOrganiserAddress,
        projectOrganiserGender,
        projectOrganiserContact,
        projectOrganiserCnic,
      } = campaign;
      campaignFor = {
        projectOrganiserName,
        projectOrganiserAddress,
        projectOrganiserGender,
        projectOrganiserContact,
        projectOrganiserCnic,
      };
    } else if (campaign.campaignFor == "Beneficiary") {
      const {
        beneficiaryFirstName,
        beneficiaryLastName,
        beneficiaryAge,
        beneficiaryGender,
        beneficiaryCnic,
        beneficiaryAddress,
        beneficiaryContact,
      } = campaign;
      campaignFor = {
        beneficiaryFirstName,
        beneficiaryLastName,
        beneficiaryAge,
        beneficiaryGender,
        beneficiaryCnic,
        beneficiaryAddress,
        beneficiaryContact,
      };
    }

    // causeDetails
    if (campaign.causeDetails == "Education") {
      const {
        schoolName,
        schoolEmail,
        schoolAddress,
        schoolContact,
        schoolId,
        campaignType,
        amount,
        expiry,
      } = campaign;
      causeDetails = {
        schoolName,
        schoolEmail,
        schoolAddress,
        schoolContact,
        schoolId,
        campaignType,
        amount: parseInt(amount.replace(/,/g, "")),
        expiry,
      };
    } else if (campaign.causeDetails == "Health") {
      if (campaign.hospital) {
        const {
          campaignType,
          amount,
          expiry,
          hospital,
          hospitalName,
          hospitalEmail,
          hospitalAddress,
          hospitalContact,
          patientId,
        } = campaign;
        causeDetails = {
          campaignType,
          amount: parseInt(amount.replace(/,/g, "")),
          expiry,
          hospital,
          hospitalName,
          hospitalEmail,
          hospitalAddress,
          hospitalContact,
          patientId,
        };
      } else {
        const { hospital, campaignType, amount, expiry } = campaign;
        causeDetails = {
          hospital,
          campaignType,
          amount: parseInt(amount.replace(/,/g, "")),
          expiry,
        };
      }
    } else if (campaign.causeDetails == "Other") {
      const { campaignType, amount, expiry } = campaign;
      causeDetails = {
        campaignType,
        amount: parseInt(amount.replace(/,/g, "")),
        expiry,
      };
    }

    const campaignOwnerId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const profile = getState().firebase.profile;

    // Final Campaign...

    let finalCampaign = {
      ...campaignFor,
      ...causeDetails,
      campaignFor: campaign.campaignFor,
      causeDetails: campaign.causeDetails,
      campaignTitle: values.campaignTitle,
      story: values.story,
      // campaignCreater information
      createdAt: new Date(),
      campaignOwnerId,
      campaignOrganiserName: profile.NGO
        ? profile.ngoName
        : profile.firstName + profile.lastName,
      campaignOrganiserEmail: profile.NGO ? profile.ngoEmail : profile.email,
      supporters: ["Hamzah Baig", "Minhal Aftab", "Suleman Shahid"],
      amountRaised: 0,
    };

    console.log("FINAL CAMPAIGN=> ", finalCampaign);

    // Saving data in database
    let campaignRef = firestore.collection("campaigns").doc();

    firestore
      .collection("campaigns")
      .doc(campaignRef.id)
      .set({
        ...finalCampaign,
        campaignId: campaignRef.id,
      })
      .then(() => {
        dispatch({ type: "CREATING_CAMPAIGN", finalCampaign });
      })
      .catch((err) => {
        dispatch({ type: "CREATING_CAMPAIGN_ERROR", err });
      });
  };
};
