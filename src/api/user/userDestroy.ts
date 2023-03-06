import UserDestroyer from '../../services/user/userDestroyer';
import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.userDestroy,
    );

    let remover = new UserDestroyer(req);

    await remover.destroyAll(req.query);

    // let ids;
    // if (req.query.ids && !Array.isArray(req.query.ids)) {
    //   ids = [req.query.ids];
    // } else {
    //   const uniqueIds = [...new Set(req.query.ids)];
    //   ids = uniqueIds;
    // }

    // ids.map((id) => id.trim());

    // await Promise.all(
    //   ids.map((id) => req.chatClient.user(id).delete()),
    // );

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
