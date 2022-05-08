import React, { ReactElement } from 'react';
import Card from '@components/Card';
import Layout from '@components/Layout';
import Tabs from '@components/Tabs';
import useAttributeForm from '@hooks/forms/attributeForm';
import useEventForm from '@hooks/forms/eventForm';
import useMemberForm from '@hooks/forms/memberForm';
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

  return (
    <Layout title="Admin Forms">
      <Card>
        <div className="m-4">
          <Tabs
            tabData={[
              { label: 'Member', content: MemberForm },
              { label: 'Attribute', content: AttributeForm },
              { label: 'Stone', content: StoneForm },
              { label: 'Stone Type', content: StoneTypeForm },
              { label: 'Stone order', content: StoneOrderForm },
              { label: 'Event', content: EventForm },
              { label: 'Subtheme', content: SubthemeForm },
              { label: 'Stat', content: StatForm },
              { label: 'Team', content: TeamForm },
              { label: 'User', content: UserForm },
            ]}
          />
        </div>
      </Card>
    </Layout>
  );
}
