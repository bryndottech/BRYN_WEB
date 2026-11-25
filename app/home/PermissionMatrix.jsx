'use client';

import { Fragment, useState } from 'react';

const permissions = ['Read', 'Write', 'Deploy', 'Admin'];
const roles = ['Viewer', 'Engineer', 'Owner'];
const initial = [
  [true, false, false, false],
  [true, true, true, false],
  [true, true, true, true],
];

export default function PermissionMatrix() {
  const [matrix, setMatrix] = useState(initial);

  const toggle = (roleIndex, permissionIndex) => {
    setMatrix((current) =>
      current.map((row, index) =>
        index === roleIndex
          ? row.map((value, cellIndex) => (cellIndex === permissionIndex ? !value : value))
          : row,
      ),
    );
  };

  return (
    <div className="permission-matrix">
      <span />
      {permissions.map((permission) => (
        <span key={permission}>{permission}</span>
      ))}
      {roles.map((role, roleIndex) => (
        <Fragment key={role}>
          <span>{role}</span>
          {permissions.map((permission, permissionIndex) => (
            <button
              key={permission}
              type="button"
              aria-pressed={matrix[roleIndex][permissionIndex]}
              aria-label={`${role}: ${permission}`}
              onClick={() => toggle(roleIndex, permissionIndex)}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
