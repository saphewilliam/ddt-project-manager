import cx from 'clsx';
import React, { ReactElement } from 'react';
import Card from '@components/Card';
import Layout from '@components/Layout';
import Tabs from '@components/Tabs';
import useAttributeForm from '@hooks/forms/attributeForm';
import useEventForm from '@hooks/forms/eventForm';
import useMemberForm from '@hooks/forms/memberForm';
import useProjectForm from '@hooks/forms/projectForm';
import useStatForm from '@hooks/forms/statForm';
import useStoneForm from '@hooks/forms/stoneForm';
import useStoneOrderForm from '@hooks/forms/stoneOrderForm';
import useStoneTypeForm from '@hooks/forms/stoneTypeForm';
import useSubthemeForm from '@hooks/forms/subthemeForm';
import useTeamForm from '@hooks/forms/teamForm';
import useUserForm from '@hooks/forms/userForm';

export default function TestPage(): ReactElement {
  const { form: MemberForm } = useMemberForm();
  const { form: AttributeForm } = useAttributeForm();
  const { form: StoneForm } = useStoneForm();
  const { form: StoneTypeForm } = useStoneTypeForm();
  const { form: StoneOrderForm } = useStoneOrderForm();
  const { form: EventForm } = useEventForm();
  const { form: SubthemeForm } = useSubthemeForm();
  const { form: StatForm } = useStatForm();
  const { form: TeamForm } = useTeamForm();
  const { form: UserForm } = useUserForm();
  const { form: ProjectForm } = useProjectForm();

  return (
    <Layout title="Admin Forms">
      <Card>
        <div className="m-4">
          <Tabs
            tabData={[
              // { label: 'Member', content: MemberForm },
              // { label: 'Attribute', content: AttributeForm },
              // { label: 'Stone', content: StoneForm },
              // { label: 'Stone Type', content: StoneTypeForm },
              // { label: 'Stone order', content: StoneOrderForm },
              // { label: 'Event', content: EventForm },
              // { label: 'Subtheme', content: SubthemeForm },
              // { label: 'Stat', content: StatForm },
              // { label: 'Team', content: TeamForm },
              // { label: 'User', content: UserForm },
              {
                label: 'General',
                content: (
                  <div className={cx('space-y-10')}>
                    <div>
                      <h2>Member</h2>
                      {MemberForm}
                    </div>
                  </div>
                ),
              },
              {
                label: 'Inventory',
                content: (
                  <div className={cx('space-y-10')}>
                    <div>
                      <h2>Attributes</h2>
                      {AttributeForm}
                    </div>
                    <div>
                      <h2>Stones</h2>
                      {StoneForm}
                    </div>
                    <div>
                      <h2>Color type</h2>
                      {StoneTypeForm}
                    </div>
                    <div>
                      <h2>Color order</h2>
                      {StoneOrderForm}
                    </div>
                  </div>
                ),
              },
              {
                label: 'Events',
                content: (
                  <div className={cx('space-y-10')}>
                    <div>
                      <h2>Events</h2>
                      {EventForm}
                    </div>
                    <div>
                      <h2>Subtheme</h2>
                      {SubthemeForm}
                    </div>
                  </div>
                ),
              },
              {
                label: 'Projects',
                content: (
                  <div className={cx('space-y-10')}>
                    <div>
                      <h2>Project</h2>
                      {ProjectForm}
                    </div>
                    <div>
                      <h2>Stats</h2>
                      {StatForm}
                    </div>
                  </div>
                ),
              },
              {
                label: 'Admin',
                content: (
                  <div className={cx('space-y-10')}>
                    <div>
                      <h2>Teams</h2>
                      {TeamForm}
                    </div>
                    <div>
                      <h2>Users</h2>
                      {UserForm}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Card>
    </Layout>
  );
}
