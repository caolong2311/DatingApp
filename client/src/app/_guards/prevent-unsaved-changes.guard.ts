import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = 
(component, currentRoute, currentState, nextState) => {
  if (component.editForm?.dirty) {
    return confirm('Bạn có chắc muốn rời khỏi trang? Mọi thay đổi chưa lưu sẽ bị mất.');
  }
  return true;
};
